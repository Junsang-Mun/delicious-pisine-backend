import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
const url = `https://api.notion.com/v1/databases/${process.env.NOTION_DBID}`;

function packJson(data) {
	console.log('packJson called');
	let result = {
		list: []
	};
	data.map((item) => {
		result.list.push({
			'name': item.properties.Restaurant.title[0]?.plain_text,
			'price': item.properties.Price.rich_text[0]?.plain_text,
			'category': item.properties.Category.rich_text[0]?.plain_text,
			'summary': item.properties.Summary.rich_text[0]?.plain_text,
			'coordinate': {
				'lat': item.properties.Lat?.number,
				'lng': item.properties.Lng?.number
			},
			'menu': item.properties.Menu.rich_text[0]?.plain_text,
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
		const data = null;
		console.error(`[ERROR] statue is not 200; stauts: ${response.status}`);
		return data;
	} else {
		const json = await response.json();
		const data = packJson(json.results);
		data['next'] = false;
		if (json.next_cursor) {
			data.next = json.next_cursor;
		}
		return data;
	}
}

export async function sortData() {
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
		const data = null;
		console.error(`[ERROR] statue is not 200; stauts: ${response.status}`);
		return data;
	} else {
		const json = await response.json();
		const data = packJson(json.results);
		data['next'] = false;
		if (json.next_cursor) {
			data.next = json.next_cursor;
		}
		return data;
	}

}

export async function queryData() {
	console.log('quertData');
}