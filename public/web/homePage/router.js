
import App        from './src/views/main.vue'
import Chat       from './src/views/chat.vue'
import Chatroom   from './src/views/Chatroom.vue'
import History    from './src/views/history.vue'
import myProfile  from './src/views/myProfile.vue'
import Plus       from './src/views/plus.vue'
import lifeGrid   from './src/views/smart_apps/lifeGrid.vue'
const routes = [
	{ 
		path: '/', 
		component: App,
		children: [
			{
				path: '/',
				name: 'history',
				component : History
			},
			{
				path: 'myProfile',
				name: 'myProfile',
				component : myProfile
			},
			{
				path: 'chat',
				name: 'chat',
				component : Chat,
				children: [
					{
						path: ':roomId',
						component : Chatroom
					}
				]
			},
			{
				path: 'plus',
				name: 'plus',
				component : Plus,
				children: [
					{
						path: 'lifeGrid',
						name: 'lifeGrid',
						component : lifeGrid
					}
				]
			}
		]	
	}
];
export default routes