// this is only used to test the endpoints
// note that "Success" doesnt mean it worked
// just that it didnt *crash*
(async function() {

async function test(query, method, body) {
	let b = { method, headers: {'Content-Type': 'application/json'}};
	if (body !== undefined) b.body = JSON.stringify(body);
	const a = await (await fetch('http://localhost:8080/api/'+query, b)).text();
	console.log(`${method} ${query}`);
	console.log(b, a);
	return JSON.parse(a);
}

let res = await test('tasks?act=list', 'GET');

await test('tasks?act=get&id='+res[0],'GET');

await test('tasks?act=add','POST', { name: 'one',	notes: 'aaa'});

await test('tasks?act=edit', 'PATCH', { _id: res[0], name: 'three' });

await test('tasks?act=com&id='+res[1],'PATCH');
await test('tasks?act=uncom&id='+res[2],'PATCH');
await test('tasks?act=del&id='+res[3],'DELETE');

await test('cats?act=add', 'POST', {name: 'test'});

let cats = await test('cats?act=list', 'GET');
await test('cats?act=rename&id='+cats[0]._id, 'PATCH', {name: 'test2'});
await test('cats?act=addtasks&id='+cats[0]._id, 'POST', [res[0], res[1], res[2]]);
await test('cats?act=remtasks&id='+cats[0]._id, 'POST', [res[1]]);
await test('cats?act=del&id='+cats[0]._id, 'DELETE');

console.warn('BEGIN INVALID REQUESTS');

await test('tasks?act=get&ide='+res[0],'GET');

await test('tasks?act=add','POST', {
	_id: '10'
});
await test('tasks?act=edit', 'PATCH', {
	_id: res[0]+'1',
	name: 'three'
});
await test('tasks?act=com&id=123456789012345678901234','PATCH');
await test('tasks?act=uncom&id=123456789012345678901235','PATCH');
await test('tasks?act=del&id=1234567890123456789012346','DELETE');
await test('cats?act=add', 'POST', {name: 'test'});
await test('cats?act=rename&id=123456789012345678901234', 'PATCH', {name: 'test2'});
await test('cats?act=addtasks&id=123456789012345678901235', 'POST', [res[0], res[1], res[2]]);
await test('cats?act=addtasks&id='+cats[0]._id, 'POST', ['res[0]', res[1], res[2]]);
await test('cats?act=remtasks&id=123456789012345678901236', 'POST', [res[1]]);
// await test('cats?act=remtasks&id='+cats[0]._id, 'POST', 'invalid :)');
await test('cats?act=del&id=123456789012345678901234', 'DELETE');

})();