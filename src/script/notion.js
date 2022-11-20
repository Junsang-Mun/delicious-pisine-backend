import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
const url = `https://api.notion.com/v1/databases/${process.env.NOTION_DBID}`;

function packJson(data) {
	let result = {
		list: []
	};
	data.map((item) => {
		result.list.push({
			'name': item.properties.Restaurant.title[0].plain_text,
			'price': item.properties.Price.rich_text[0].plain_text,
			'summary': item.properties.Summary.rich_text[0].plain_text,
			'coordinate': {
				'lat': item.properties.Lat.number,
				'lng': item.properties.Lng.number
			},
			'menu': item.properties.Menu.rich_text[0].plain_text,
		});
	});
	return result;
}

export async function listData() {
	const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Notion-Version': '2022-06-28',
			'content-type': 'application/json',
			authorization: `Bearer ${process.env.NOTION_TOKEN}`
		},
		body: JSON.stringify({page_size: 100})
	};
	const response = await fetch(`${url}/query`, options);
	if (response.status !== 200) {
		console.error(`[ERROR] statue is not 200; stauts: ${response.status}`);
	} else {
		const json = await response.json();
		return packJson(json.results);
	}
}

export async function queryData() {
	console.log('quertData');
}