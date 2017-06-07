
import App     from './src/views/main.vue'
import Chat    from './src/views/chat.vue'
const routes = [
	{ 
		path: '/', 
		component: App,
		children: [
			{
				path: '/',
				component : Chat
			},
			{
				path: 'chat',
				component : Chat
			}
		]	
	}
];
export default routes