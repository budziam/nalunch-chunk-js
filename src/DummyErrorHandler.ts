export class DummyErrorHandler {
    public handle(e: Error, options?: any): void {
        console.error(e, options);
    }
}
