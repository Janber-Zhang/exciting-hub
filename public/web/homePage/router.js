
import App        from './src/views/main.vue'
import Chat       from './src/views/chat.vue'
import History    from './src/views/history.vue'
const routes = [
	{ 
		path: '/', 
		component: App,
		children: [
			{
				path: '/',
				component : History
			},
			{
				path: 'chat',
				component : Chat
			}
		]	
	}
];
export default routes