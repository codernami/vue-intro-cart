app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    ` <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img 
                :class="{ 'out-of-stock-img': !inStock }" 
                :src="image">
            </div>

            <div class= "product-info">
                <h1> {{ title }} </h1>
                <p> {{ sale }} </p>
                <p>{{ description }}</p>
                <p v-if= "inStock">
                    In Stock
                </p>
                <p v-else  class= "red-text">
                    Out of Stock
                </p>

                <p>Shipping: {{ shipping }}</p>
                
                <product-details :details= "details"></product-details>

                <ul class= "list-sizes">
                    <li v-for="(size, index) in sizes" :key="index">
                        {{ size }}
                    </li>
                </ul>

                <div class= "list-colors">
                    <div 
                        class="color-circle"
                        v-for="(variant, index) in variants" :key="variant.id"  @mouseover="updateVariant(index)"
                        :style= "{ backgroundColor: variant.color }">
                    </div>
                </div>

                <button class= "button" 
                :class = "{ disabledButton: !inStock}"
                :disabled= "!inStock"
                @click= "addToCart">
                    Add to Cart
                </button>
                
                <button class="button" 
                :class="{ disabledButton: !inStock }" 
                :disabled="!inStock" 
                @click="removeFromCart">
                    Remove Item
                </button>
            </div>
        </div>
        <div class= "reviews">
            <review-form @review-submitted="addReview"></review-form>
            <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        </div>    
    </div> `,
    data() {
        return {
            product: 'Socks',
            brand: 'Mastery',
            description: 'Socks description.',
            selectedVariant: 0,
            alt: 'socks',
            onSale: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            sizes: ['S', 'M', 'L', 'XL'],
            variants: [
                { id: 2234, color: 'green', image: './styles/imgs/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', image: './styles/imgs/socks_blue.jpg', quantity: 0 },
            ],
            reviews: []
        }    
    },

    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        sale() {
            if(this.onSale) {
                return this.brand + ' ' + this.product + ' is on sale.'
            }
            return ''
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        }
    }
})