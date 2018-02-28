import Foot from 'components/Foot.vue'
let mixin = {
    filters: {
        currency(price) {
            return price.toFixed(2)
        }
    },
    components: {
        Foot
    }
}
export default mixin