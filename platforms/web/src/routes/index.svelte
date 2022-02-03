<script lang="ts">
	// Importing modules
	import {
		BadgeCheck,
		ChevronDown,
		ColorSwatch,
		ExternalLink,
		Globe,
		Icon,
		ViewGrid
	} from 'svelte-hero-icons';

	let headerTabs = [
		{
			icon: Globe,
			text: 'Главная'
		},
		{
			icon: BadgeCheck,
			text: 'Возможности'
		}
	];

	let heroTiles = [
		{
			title: 'Полностью бесплатно',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, reiciendis.'
		},
		{
			title: 'Удобен в использовании',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, reiciendis.'
		},
		{
			title: 'Полная автоматизация',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, reiciendis.'
		},
		{
			title: 'Система отчётов и статистики',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, reiciendis.'
		}
	];
</script>

<!-- Header -->
<header
	class="absolute top-0 px-3 py-3 w-full bg-zinc-800 shadow-lg flex justify-between items-stretch"
>
	<!-- Tabs -->
	<div class="flex items-stretch">
		<!-- Logotype -->
		<button class="mx-2 p-2 rounded-xl text-white opacity-60 hover:bg-zinc-600 hover:opacity-100">
			<img
				class="w-5 h-5"
				src="https://res.cloudinary.com/lococovu-cdn/image/upload/v1610999988/logotypes/odzi-dog-small-white.svg"
				alt=""
			/>
		</button>

		{#each headerTabs as tab}
			<button
				class="mx-2 px-3 py-2 flex items-center text-white opacity-60 hover:bg-zinc-600 hover:opacity-100 rounded-xl"
			>
				<!-- Icon -->
				<Icon src={tab.icon} class="h-5 w-5" />

				<!-- Text -->
				<p class="text-sm ml-1.5">{tab.text}</p>
			</button>
		{/each}
	</div>
</header>

<!-- First Hero -->
<section class="w-full h-screen bg-zinc-900 flex items-center justify-start px-6">
	<!-- Text -->
	<div class="text-left w-2/3">
		<!-- Title and subtitle -->
		<h1 class="text-6xl text-white">Удобное приложение для мониторинга времени</h1>
		<p class="text-lg text-white opacity-60">
			Нельзя отрицать что у людей XXI-ого столетия есть проблемы с временем. Большинство из нас
			использует его не туда, куда нужно/хотелось бы. Ну и... Лично мы помочь вам с этим никак не
			сможем. Помочь вы должны себе сами - запомните это навсегда. Мы же просто предоставляем
			удобный сервис для этого.
		</p>

		<!-- Buttons -->
		<div class="mt-6 flex items-center justify-start">
			<button
				class="rounded-full px-6 py-2 bg-gradient-to-tr from-purple-400 to-indigo-500 flex items-center justify-center text-white"
			>
				<Icon src={ExternalLink} class="w-4 h-4" />

				<p class="text-base ml-2">Зарегистрироваться</p>
			</button>

			<!-- Learn more -->
			<button
				class="rounded-full ml-4 px-6 py-2 bg-zinc-800 flex items-center justify-center text-white"
			>
				<Icon src={ChevronDown} class="w-4 h-4" />

				<p class="text-base ml-2">Узнать больше</p>
			</button>
		</div>
	</div>
</section>

<!-- Second Hero -->
<section class="w-full flex items-end justify-center bg-zinc-900">
	<!--  -->
	<div class="w-full flex px-12">
		{#each heroTiles as tile}
			<div
				class="mx-2 w-1/4 rounded-t-xl border-2 border-b-0 border-zinc-700 py-10 px-6 hover:bg-indigo-400 hover:border-indigo-400 hover:cursor-pointer"
			>
				<!-- Image (+todo) -->

				<!-- Title -->
				<div class="">
					<!-- Title badge -->
					<div class="w-min rounded-full px-2 py-0.5 bg-zinc-800 opacity-60">
						<p class="text-extra-xs text-white">Преимущество</p>
					</div>

					<h1 class="mt-1.5 text-xl text-white">{tile.title}</h1>
					<p class="text-sm text-white opacity-60">{tile.description}</p>
				</div>
			</div>
		{/each}
	</div>
</section>
