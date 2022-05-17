import { LsifSymbol as TypescriptLsifSymbol } from './lsif-typescript/LsifSymbol';
import * as lsif from './lsif';

import { Counter } from './lsif-typescript/Counter';

// @ts-ignore
export class ScipSymbol extends TypescriptLsifSymbol {
    constructor(value: string) {
        super(value);
    }

    public static override package(name: string, version: string): TypescriptLsifSymbol {
        name = name.replace(/\./, '/');
        name = name.trim();

        // @ts-ignore
        return new TypescriptLsifSymbol(`scip-python pypi ${name} ${version} `);
    }
}
