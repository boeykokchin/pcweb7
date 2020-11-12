import React from 'react';
import ReactDOM from 'react-dom';
import SelectedProduct from './SelectedProduct';

// function Products() {
//     return (
//         <div className="container">
//             <div className="row justify-content-center">
//                 <div className="col-md-8">
//                     <div className="card">
//                         <div className="card-header">Products Component</div>

//                         <div className="card-body">I'm an Products component!</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Products;

class Products extends React.Component {

    constructor() {
        super();
        this.state = {
            allProducts: [],
            currentProduct: [],
            shoppingCart: [],
            showProduct: false,
            showCart: false,
        };

        let __IsMounted = false;
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        this.__IsMounted = true;
        fetch('/productsALL')
        .then(response => {
            return response.json();
        })
        .then(allProducts => {
            if (this.__IsMounted) {
                this.setState({allProducts: allProducts});
            }
        });
    }

    componentWillUnmount() {
        this.__IsMounted = false;
    }

    renderProducts() {
        return this.state.allProducts.map(product => {
            return (
                <div className="mb-5" key={product.id}>
                    <button onClick={()=>this.showProduct(product)} className="btn btn-info"><h2>{product.name}</h2></button>
                </div>
            );
        })
    }

    showProduct(product) {
        this.setState({
            currentProduct: product,
            showProduct: true
        },
            () => {
            console.log(this.state.currentProduct);
            });
    }

    addToCart(product) {
        let productAlreadyInCart = false;
        this.state.shoppingCart.forEach(item => {
            if (item.name === product.name) {
                productAlreadyInCart = true;
                item.qty = parseInt(item.qty) + parseInt(product.qty);
            }
        });
        if (!productAlreadyInCart) {
            this.setState({
                shoppingCart: [...this.state.shoppingCart, product],
            });
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">

                        <div className="col-3">
                            <h1 className='mb-5'>Products</h1>
                                { this.renderProducts() }
                        </div>

                        <div className="col-7">
                            {this.state.showProduct ?
                            <SelectedProduct
                            product={this.state.currentProduct}
                            onAdd={this.addToCart}
                            />
                            : null}
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

export default Products;

if (document.getElementById('products')) {
    ReactDOM.render(<Products />, document.getElementById('products'));
}
