import { TweenMax, Power2, TimelineLite } from 'gsap/TweenMax';

export default {
    start() {
        const dd = document.getElementsByClassName('.search__field')[0];

        TweenMax.to(dd, 2, { width: '200px', height: '150px' });
    },
};
