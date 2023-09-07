import { main } from '../src/main-impl';
import * as path from 'path';
import * as fs from 'fs';

function testMain(mode: 'check' | 'update'): void {
    const nodePath = process.argv[0];
    // Returns list of subdir names, not absolute paths.
    const inputDir = path.join('.', 'snapshots', 'input');
    const subdirNames = fs.readdirSync(inputDir);
    const packageInfoPath = path.join('.', 'snapshots', 'packageInfo.json');
    const packageInfo = JSON.parse(fs.readFileSync(packageInfoPath, 'utf8'));
    for (const subdirName of subdirNames) {
        console.assert(path.dirname(subdirName) === '.');
        let projectName = packageInfo['default']['name'];
        let projectVersion = packageInfo['default']['version'];
        if (subdirName in packageInfo['special']) {
            projectName = packageInfo['special'][subdirName]['name'];
            projectVersion = packageInfo['special'][subdirName]['version'];
        }
        const argv = [
            nodePath,
            path.resolve('./index.js'),
            'snapshot-dir',
            './snapshots',
            '--environment',
            'snapshots/testEnv.json',
            '--quiet',
            '--project-name',
            projectName,
            '--project-version',
            projectVersion,
            '--only',
            subdirName,
        ];
        if (mode === 'check') {
            argv.push('--check');
        }
        main(argv);
    }
}

if (process.argv.indexOf('--check') !== -1) {
    testMain('check');
} else {
    testMain('update');
}
