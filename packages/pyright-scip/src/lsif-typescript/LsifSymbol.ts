import { descriptorString } from './Descriptor';
import { scip } from '../scip';

export class LsifSymbol {
    private constructor(public readonly value: string) {}

    public isEmpty(): boolean {
        return this.value === '';
    }

    public isLocal(): boolean {
        return this.value.startsWith('local ');
    }

    public static local(counter: number): LsifSymbol {
        return new LsifSymbol(`local ${counter}`);
    }

    public static empty(): LsifSymbol {
        return new LsifSymbol('');
    }

    public static package(name: string, version: string): LsifSymbol {
        return new LsifSymbol(`lsif-typescript npm ${name} ${version} `);
    }

    public static global(owner: LsifSymbol, descriptor: scip.Descriptor): LsifSymbol {
        const s = descriptorString(descriptor);
        if (s.indexOf('SuchNestedMuchWow') !== -1) {
            throw new Error('Got problematic descriptor with owner: ' + owner.value);
        }
        return new LsifSymbol(owner.value + s);
    }
}
