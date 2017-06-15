
import App        from './src/views/main.vue'
import Chat       from './src/views/chat.vue'
import Chatroom   from './src/views/Chatroom.vue'
import History    from './src/views/history.vue'
import myProfile  from './src/views/myProfile.vue'
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
				path: 'myProfile',
				component : myProfile
			},
			{
				path: 'chat',
				component : Chat,
				children: [
					{
						path: ':roomId',
						component : Chatroom
					}
				]
			}
		]	
	}
];
export default routes