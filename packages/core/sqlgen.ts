import { Topology } from "schema-runtime";
import { User, Format, TargetAudience, Organizer, Training, Feedback, Materials, Request } from "./schema";

class Context {
    private isNullable: boolean = false;
    private currentTable: [string, string] | undefined = undefined;
    relations: string[] = [];
    inTable<T>(name: string, field: string, f: () => T): T {
        this.currentTable = [name, field];
        const result = f();
        this.currentTable = undefined;
        return result;
    }
    inMaybe<T>(val: boolean, f: () => T): T {
        this.isNullable = val;
        const result = f();
        this.isNullable = false;
        return result;
    }
    getCurrentTable() {
        return this.currentTable;
    }
    getIsNullable() {
        return this.isNullable;
    }

}
const ctx: Context = new Context();

type SqlT<T> = (context: Context) => string;
declare const Sql: unique symbol;
type Sql = typeof Sql;
declare module "hkt" {
    interface Hkt<T> {
        [Sql]: SqlT<T>
    }
}

// TODO: Is serial type enough for table ids???
export const sql: Topology<Sql> = {
    interface: (name: string, fields: Record<string, (c: Context) => string>) => (ctx) => {
        const relation = ctx.getCurrentTable();
        if (relation) {
            const [currentTable, field] = relation
            ctx.relations.push(`
            ALTER TABLE "${currentTable}" 
            ADD CONSTRAINT "${field}" 
            FOREIGN KEY (id) 
            REFERENCES "${name}"(id);`);
            return `SERIAL`;
        }
        const tableFields =
            Object
                .entries(fields)
                .map(
                    ([key, type]) =>
                        ctx.inTable(name, key, () => {
                            return `"${key}" ${type(ctx)}`
                        })
                )
                .join(',\n');
        return `CREATE TABLE "${name}" (
                    id SERIAL NOT NULL,
                    ${tableFields},
                    CONSTRAINT ${name}_pk PRIMARY KEY (id)
        );`;
    },
    string: (ctx) => `TEXT${ctx.getIsNullable() ? '' : ' NOT NULL'}`,
    unixTime: (ctx) => `INTEGER${ctx.getIsNullable() ? '' : ' NOT NULL'}`,
    number: (ctx) => `INTEGER${ctx.getIsNullable() ? '' : ' NOT NULL'}`,
    maybe: (s: (ctx: Context) => string) => (ctx) => {
        return ctx.inMaybe(true, () => s(ctx));
    },
    ref: (f: () => (ctx: Context) => string) => (ctx) => f()(ctx),
};

const tables = [
    User,
    Format,
    TargetAudience,
    Organizer,
    Training,
    Request,
    Feedback,
    Materials
]
tables.forEach((table) => console.log(table(sql)(ctx)));
console.log(ctx.relations.join('\n'));