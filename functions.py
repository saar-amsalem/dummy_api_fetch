import requests

def fetch_products(params):
    try:
        url = f'https://dummyjson.com/products{params}'
        response = requests.get(url)
        return response.json()['products']
    except Exception as e:
        print(e)
        return []
