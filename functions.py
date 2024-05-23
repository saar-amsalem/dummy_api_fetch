import requests

def fetch_products(params):
    try:
        url = f'https://dummyjson.com/products{params}'
        print(url)
        response = requests.get(url)
        print(response.json()['products'])
        return response.json()['products']
    except Exception as e:
        print(e)
        return []
