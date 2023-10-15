import { post } from "jquery"
import { useEffect, useState } from "react"
import ModalButton from "./components/ModalBtn"


const Posts = () => {

	const URL = "/api/posts"
	const [allPosts, setPosts] = useState([])

	const getPosts = async () => {
		const options = {
			method: 'GET'
		}
		const result = await fetch(URL, options)
		if (result.ok) {
			const posts = await result.json();
			setPosts(posts)
		}
	}

	const addPost = async () => {

		const headerFromUser = document.querySelector('#header').value;
		const textFromUser = document.querySelector('#text').value;

		const newPost = {
			header: headerFromUser,
			text: textFromUser
		}

		const headers = new Headers();
		headers.set('Content-Type', 'application/json');

		const options = {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(newPost)
		}

		const result = await fetch(URL, options)
		if (result.ok) {
			const posts = await result.json();
			setPosts([...allPosts, posts])
		}
	}

	const updatePost = async (oldPost) => {

		const headers = new Headers();
		headers.set('Content-Type', 'application/json');

		const options = {
			method: 'PATCH',
			headers: headers,
			body: JSON.stringify(oldPost)
		}

		const result = await fetch(URL, options)
		if (result.ok) {
			const updPost = await result.json();
			setPosts(allPosts.map(post => {
				if (post.id === updPost.id) {
					return updPost;
				}
				return post;
			}))
		}
	}

	const deletePost = async (id) => {
		const options = {
			method: 'DELETE',
			headers: new Headers()
		}
		const result = await fetch(URL + `/${id}`, options)

		if (result.ok) {
			setPosts(allPosts.filter(x => x.id !== id))
		}

	}

	useEffect(() => {
		getPosts()
	}, [])

	return (
		<div>
			<div>
				<p>Posts</p>
				<div style={{ margin: "10px" }}>
					<input id="header" type="text" />
				</div>
				<div style={{ margin: "10px" }}>
					<textarea id="text" />
				</div >
				<button onClick={() => addPost()}>Add post</button>
			</div>
			<div>
				{allPosts.map(post => <PostItem key={post.id} post={post} deleteAction={deletePost} updateAction={updatePost} />)}
			</div>
		</div>
	)
}

const PostItem = ({ post, deleteAction, updateAction }) => {
	return (<div>
		<h2>
			{post.header}
		</h2>
		<p>{post.text}</p>
		<button onClick={() => deleteAction(post.id)}>Delete</button>
		<ModalButton btnName={'Update'} title={"Update post"}
			modalContent={
				<div>
					<p>Posts</p>
					<div style={{ margin: "10px" }}>
						<input id="header" type="text" defaultValue={post.header}
							onChange={e => post.header = e.target.value} />
					</div>
					<div style={{ margin: "10px" }}>
						<textarea id="text" defaultValue={post.text}
							onChange={e => post.text = e.target.value} />
					</div >
					<button onClick={() => updateAction(post)}>Update post</button>
				</div>
			}
		/>
	</div>)
}


export default Posts;