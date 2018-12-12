#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const importFile = async (filename) => {
	const fileContents = JSON.parse(fs.readFileSync(filename));

	const valueType = fileContents.valueType;
	const values = fileContents.values;
	values.forEach(async (value) => {
		const importInput = {
			valueType,
			values: [value],
		};

		const response = await fetch(`http://${process.env.PRISMA_API_HOST}/import`, {
			method: 'POST',
			body: JSON.stringify(importInput),
			headers: { 'Content-Type': 'application/json' },
		});
		const resultJson = await response.json();
		const resultText = resultJson[0];

		if (resultText.includes('duplicate key value violates unique constraint')) {
			console.log('Already present ', value._typeName, value.id);
		} else if (resultText.includes('Failure')) {
			console.log('Failed import', value._typeName, value.id, resultText);
		} else {
			console.log('Imported', value._typeName, value.id);
		}
	});
};

const dirContents = fs.readdirSync(path.resolve(__dirname, '../seed-data'));

dirContents.forEach(async (file) => {
	await importFile(path.resolve(__dirname, '../seed-data', file));
});
