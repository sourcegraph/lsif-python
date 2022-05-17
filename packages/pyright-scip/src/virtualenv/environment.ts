import * as fs from 'fs';
import * as child_process from 'child_process';
import PythonPackage from './PythonPackage';
import PythonEnvironment from './PythonEnvironment';
import { withStatus } from 'src/status';

// Some future improvements:
//  - Could use `importlib` and execute some stuff from Python

interface PipInformation {
    name: string;
    version: string;
}

function pipList(): PipInformation[] {
    return JSON.parse(child_process.execSync('pip list --format=json').toString()) as PipInformation[];
}

function pipBulkShow(names: string[]): string[] {
    // TODO: This probably breaks with enough names. Should batch them into 512 or whatever the max for bash would be
    return child_process
        .execSync(`pip show -f ${names.join(' ')}`)
        .toString()
        .split('---');
}

export default function getEnvironment(
    projectFiles: Set<string>,
    projectVersion: string,
    cachedEnvFile: string | undefined
): PythonEnvironment {
    if (cachedEnvFile) {
        let f = JSON.parse(fs.readFileSync(cachedEnvFile).toString()).map((entry: any) => {
            return new PythonPackage(entry.name, entry.version, entry.files);
        });

        return new PythonEnvironment(projectFiles, projectVersion, f);
    }

    return withStatus('Evaluating python environment dependencies', (spinner) => {
        const listed = pipList();

        spinner.render();
        const bulk = pipBulkShow(listed.map((item) => item.name));

        spinner.render();
        const info = bulk.map((shown) => {
            spinner.render();
            return PythonPackage.fromPipShow(shown);
        });

        spinner.render();
        return new PythonEnvironment(projectFiles, projectVersion, info);
    });
}
