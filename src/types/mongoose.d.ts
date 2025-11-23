declare global {
  type MongooseModule = typeof import("mongoose");
  var mongoose:
    | {
        conn: MongooseModule | null;
        promise: Promise<MongooseModule> | null;
      }
    | undefined;
}

export {};
