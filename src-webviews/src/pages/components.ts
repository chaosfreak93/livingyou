import { shallowRef } from 'vue';
import Login from './login/Login.vue';
import CharSelector from './charSelector/CharSelector.vue';

// Append components here...
// All components that you want to load...
// New interfaces, menus, etc.
const componentList = {
    Login: shallowRef(Login),
    CharSelector: shallowRef(CharSelector),
};

function generateComponentList(): Array<{ name: string; component: unknown }> {
    const components = [];
    Object.keys(componentList).forEach((key) => {
        components.push({ name: key, component: shallowRef(componentList[key]) });
    });

    return components;
}

export default {
    generateComponentList,
    componentList,
};
