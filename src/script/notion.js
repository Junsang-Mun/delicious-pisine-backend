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
				'loc': item.properties.Location.rich_text[0]?.plain_text,
				'lat': item.properties.Lat?.number,
				'lng': item.properties.Lng?.number
			},
			'detail': item.properties.Detail.rich_text[0]?.plain_text,
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

export async function sortData(sortOption) {
	let prop;
	let dir;
	switch(sortOption) {
	case 'P_LTH': //price low to high
		console.log('p_lth');
		prop = 'Price';
		dir = 'ascending';
		break;
	case 'P_HTL': //price high to low
		console.log('p_htl');
		prop = 'Price';
		dir = 'descending';
		break;
	case 'A_ATZ': //restaurant name alphabetical order
		console.log('a_atz');
		prop = 'Restaurant';
		dir = 'ascending';
		break;
	case 'A_ZTA': //restaurant name reversed alphabetical order
		console.log('a_zta');
		prop = 'Restaurant';
		dir = 'descending';
		break;
	case 'C_ATZ': //category alphabetical order
		console.log('c_atz');
		prop = 'Category';
		dir = 'ascending';
		break;
	case 'C_ZTA': //category reversed alphabetical order
		console.log('c_zta');
		prop = 'Category';
		dir = 'descending';
		break;
	default:
		break;
	}
	const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Notion-Version': '2022-06-28',
			'content-type': 'application/json',
			authorization: `Bearer ${process.env.NOTION_TOKEN}`
		},
		body: JSON.stringify({
			sorts: [{
				'property': `${prop}`,
				'direction': `${dir}`
			}],
			page_size: 100
		})
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