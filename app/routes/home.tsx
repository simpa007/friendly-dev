import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "The Freindly Dev" },
		{ name: "description", content: "my portfolio page" },
	];
}

export default function Home() {
	return <div>HomePage</div>;
}
