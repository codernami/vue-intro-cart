app.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: 
        `<ul class= "list-details">
            <li v-for= "detail in details">{{ detail }}</li>
        </ul> `,
})