import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "The Freindly Dev" },
		{ name: "description", content: "My portfolio page" },
	];
}

export default function Home() {
	return <div>Homepage</div>;
}
