export default {
    bind(el, binding, vnode) {
        el.clickOutsideElement = (event) => {
            if (el !== event.target && !el.contains(event.target)) {
                vnode.context[binding.expression](event);
            }
        }

        document.body.addEventListener('click', el.clickOutsideElement, false);
    },
    unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideElement);
    }
}