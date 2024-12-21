from app import app, db, Product  

mock_products = [
    {"name": "Wireless Headphones", "price": 50.99, "category": "Electronics", "description": "Noise-canceling headphones."},
    {"name": "Running Shoes", "price": 75.49, "category": "Sportswear", "description": "Lightweight running shoes."},
    {"name": "Smartphone", "price": 699.99, "category": "Electronics", "description": "Latest model smartphone with AMOLED display."},
    # Add more mock data as needed...
]


with app.app_context():  
    for i in range(100):  
        product = Product(
            name=f"Product {i+1}",
            price=round(10 + i * 1.5, 2),  
            category="Category " + str((i % 5) + 1),  
            description=f"Description for Product {i+1}"
        )
        db.session.add(product)
    db.session.commit()  
    print("Database populated with mock data!")
