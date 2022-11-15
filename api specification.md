# API Specification document for 42 Delicious

## Get a full list of restaurants

### Endpoint
> https://(domain)/api/list

### Request params
| Method | Authorization |
| - | - |
| GET | None |

### Body params
N/A

### Response
| Type | HTTP Status Code | expected response |
| - | - | - |
| Success | `200` | asdf |
| Fail | `400` | asdf |


### Notes
This endpoint always return a array of restaurants with randomly sorted.

## Query restaurant datas

### Endpoint
> https://(domain)/api/query

### Request params
| Method | Authorization |
| - | - |
| GET | None |

### Body params
| Key | type | Required | Comment
| - | - | - | - |
| sort | string | Yes | `price`: sort by price<br>`type`: sort by type of foods
| direction | string | Partially | `HTL`: High to Low<br>`LTH`: Low to High<br>won't affect if `sort` value is `type`
| type | string | Partially | won't affect if `sort` value is not `type`

### Response
| Type | HTTP Status Code | expected response |
| - | - | - |
| Success | `200` | asdf |
| Fail | `400` | asdf |

### Notes
N/A