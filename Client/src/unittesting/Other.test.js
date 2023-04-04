
// error handling
// async calls 
test('shows how async / await works', async () => {
    // async function call testings
    const success = await Promise.resolve(true);
    expect(success).toBe(true);

    // async function call testings
    const reject = await Promise.resolve(false);
    expect(reject).toBe(false);
});

