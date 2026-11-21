const playlistIDs = [
  "37i9dQZF1DWXRqgorJj26U", // Rock Classics
  "37i9dQZF1DXcBWIGoYBM5M", // Today's Top Hits
  "37i9dQZEVXbMDoHDwVN2tF", // Top 50 - Global
  // "37i9dQZF1DX4JAvHpjipBk", // New Music Friday
  "37i9dQZF1DX4o1oenSJRJd", // All Out 00s
  "37i9dQZF1DXbTxeAdrVG2l", // All Out 90s
  "37i9dQZF1DX4UtSsGT1Sbe", // All Out 80s
  "37i9dQZF1DWTJ7xPn4vNaz", // All Out 70s
  "37i9dQZF1DXaKIA8E7WcJj", // All Out 60s
  "37i9dQZF1DWSV3Tk4GO2fq", // All Out 50s
  "37i9dQZF1DX0XUsuxWHRQd", // RapCaviar
  "37i9dQZF1DX8C9xQcOrE6T" // Disney Hits
];

const songIDs = [
  // 1960s
  "0MKqeOVdZcUFGJvWpGCKbG", // The Beatles — Come Together
  "606rdbOqKsPx2GFJEEcLZd", // The Rolling Stones — Paint It, Black
  "7IGohwIFAA8NimsLK2YM56", // Jimi Hendrix — All Along the Watchtower
  "3vFygC0p8yq60QwjD4sV4q", // Cream — Sunshine of Your Love

  // 1970s
  "5CQ30WqJwcep0pYcV4AMNc", // Led Zeppelin — Stairway to Heaven
  "4u7EnebtmKWzUH433cf5Qv", // Queen — Bohemian Rhapsody
  "40riOy7x9W7GXjyGp4pjAv", // Eagles — Hotel California
  "5EWPGh7jbTNO2wakv8LjUI", // Lynyrd Skynyrd — Free Bird
  "0GxXUdLEOARGAuUCGPEQw8", // Lynyrd Skynyrd — Sweet Home Alabama
  "5HNCy40Ni5BZJFw1TKzRsC", // Pink Floyd — Comfortably Numb
  "6mFkJmJqdDVQ1REhVfGgd1", // Pink Floyd — Wish You Were Here
  "0FeCO85RKW8fDRytwXof2x", // Fleetwood Mac — Go Your Own Way
  "0ofHAoxe9vBkTCp2UQIavz", // Fleetwood Mac — Dreams
  "77h5APrMzJhARbwwKdWCNY", // AC/DC — Highway to Hell
  "2WuTnB64b2F6Fa2XYnCRH3", // Boston — More Than a Feeling
  "1lhmgubpHo0AGAX7BCiO2a", // Kansas — Carry On Wayward Son
  "5sieEeOuqDXjgd0BclmXKH", // Deep Purple — Smoke on the Water
  "3AYBKkoSM1R0w3qJCtXRsP", // Aerosmith — Dream On
  "3w2GGz0HjIu9OcWXINRFJR", // Led Zeppelin — Rock and Roll
  "7FQSAiopqWOgCGqUNbDvh3", // Black Sabbath — Paranoid
  "755bvJDSA3LNcNuFgBT9LK", // Black Sabbath — Iron Man
  "5VKU0Lh9deNkVq046FVIir", // The Who — Baba O'Riley
  "5k5smMM3tbs9rbSdy2d95F", // The Who — Won't Get Fooled Again
  "557FXhTs1bTc65KKMUOHVu", // David Bowie — Heroes
  "2jqN63mKPBoScL2veSwn6x", // Elton John — Rocket Man
  "0BPLZQI3hLnTG9sfuaFjJR", // Heart — Barracuda
  "4tYpXPNvHZORYI2iNaydLA", // Blue Öyster Cult — (Don't Fear) The Reaper
  "6BY21kxrOjAdDm4k0Wh1aj", // The Doors — Riders on the Storm
  "1MlnK8r2dX7k1Cd6PDTyqD", // The Clash — London Calling
  "1HOMkjp0nHMaTnfAkslCQj", // The Knack — My Sharona
  "5a6KyT9KATJU06LwRMg9Bz", // Santana — Black Magic Woman
  "6pKDYgGvwfalcsx1tbYfn7", // Dire Straits — Sultans of Swing
  "6hFtEmLI2jtXd5jqd3wwJd", // Elton John — Tiny Dancer
  "70C4NyhjD5OZUMzvWZ3njJ", // Billy Joel — Piano Man

  // 1980s
  "08mG3Y1vljYA6bvDt4Wqkj", // AC/DC — Back in Black
  "7o2CTH4ctstm8TNelqjb51", // Guns N' Roses — Sweet Child O' Mine
  "5NIPsWpDjJTFBoPxCUUeXp", // Guns N' Roses — Welcome to the Jungle
  "1uTbFcWsB8Vptdf7U9qCHT", // Bon Jovi — Livin' on a Prayer
  "3UMVWzrpFuV8LbgsqzKveb", // Journey — Don't Stop Believin'
  "5vdp5UmvTsnMEMESIF2Ym7", // Queen — Another One Bites the Dust
  "7pJEjPeAh3CiJRcBc4oaZH", // U2 — With or Without You
  "1JSTJqkT5qHq8MDJnJbRE1", // The Police — Every Breath You Take
  "06dhbuIVE5B6aX1b9y2I2p", // Van Halen — Jump
  "4nFNJmjfgBF7jwv2oBC45b", // Dire Straits — Money for Nothing
  "02xhLoVqpGmOqvolgrwM8w", // Metallica — One
  "7Je5fiVdnpGSI0bXHmapPM", // Def Leppard — Pour Some Sugar on Me
  "0PX5DeeFUEVhA5LEeomIlG", // Toto — Africa
  "64F1ojnPPiJiFZtYQtHB7r", // Survivor — Eye of the Tiger
  "0GONea6G2XdnHWjNZd6zt3", // Bryan Adams — Summer of '69
  "76GlO5H5RT6g7y0gev86Nk", // The Cure — Just Like Heaven
  "7707eDBpR4qtNFoQ6nQyeR", // R.E.M. — The One I Love
  "7JKpvExRQ3pZ9PxngB0NkS", // Whitesnake — Here I Go Again
  "46pu3x5HjvOxJBehVyvuh8", // Europe — The Final Countdown
  "5eU8qMd0TpaLqTGDZJaLDs", // INXS — Need You Tonight
  "7ACxUo21jtTHzy7ZEV56vU", // Ozzy Osbourne — Crazy Train
  "0rRohrJjaHpVqEphvY2dsS", // Scorpions — Rock You Like a Hurricane
  "29976iFaurObbrJdrEDg5X", // Twisted Sister — We're Not Gonna Take It
  "0A4PZuepTcIQVvA5m7R0M1", // Simple Minds — Don't You (Forget About Me)

  // 1990s
  "5ghIJDpPoe3CfHMGu71E6T", // Nirvana — Smells Like Teen Spirit
  "4P5KoWXOxwuobLmHXLMobV", // Nirvana — Come as You Are
  "1L94M3KIu7QluZe63g64rv", // Pearl Jam — Alive
  "2EoOZnxNgtmZaD8uUmz2nD", // Soundgarden — Black Hole Sun
  "6L89mwZXSOwYl76YXfX13s", // Green Day — Basket Case
  "3d9DChrdc6BOeFsbrZ3Is0", // Red Hot Chili Peppers — Under the Bridge
  "7ygpwy2qP3NbrxVkHvUhXY", // Oasis — Wonderwall
  "5sICkBXVmaCQk5aISGR3x1", // Metallica — Enter Sandman
  "70LcF31zb1H0PyJoS1Sx1r", // Radiohead — Creep
  "5UWwZ5lm5PKu6eKsHAGxOk", // Foo Fighters — Everlong
  "1FTSo4v6BOZH9QxKc3MbVM", // Blur — Song 2
  "50h65cyBVsI4fIUa57jOHK", // Alice in Chains — Man in the Box
  "48UPSzbZjgc449aqz8bxox", // Red Hot Chili Peppers — Californication
  "7EZC6E7UjZe63f1jRmkWxt", // The Cranberries — Zombie
  "3h5zik31hTTat9jmpCZZNC", // The Smashing Pumpkins — 1979
  "2vHnjoM1XuXWGu1yQbNLmO", // Oasis — Don't Look Back in Anger
  "63OQupATfueTdZMWTxW03A", // Radiohead — Karma Police
  "57iDDD9N9tTWe75x6qhStw", // The Verve — Bitter Sweet Symphony
  "1Fmqdji2Fqvh4UUzPlyL2z", // Weezer — Buddy Holly
  "2TAQ9YGehOKWDqDak5DuXc", // Stone Temple Pilots — Plush
  "1FkoVC85Ds3mFoK0fVqEqP", // The Offspring — Self Esteem
  "2m1hi0nfMR9vdGC8UcrnwU", // blink-182 — All the Small Things
  "31AOj9sFz2gM0O3hMARRBx", // R.E.M. — Losing My Religion

  // 2000s
  "3dPQuX8Gs42Y7b454ybpMR", // The White Stripes — Seven Nation Army
  "003vvx7Niy0yvhvHt4a68B", // The Killers — Mr. Brightside
  "60a0Rd6pjrkxjPbaKzXjfq", // Linkin Park — In the End
  "1hwJKpe0BPUsq6UUrwBWTw", // Green Day — Boulevard of Broken Dreams
  "7x8dCjCr0x6x2lXKujYD34", // Foo Fighters — The Pretender
  "0BCPKOYdS2jbQ8iyB56Zns", // Coldplay — Clocks
  "0ntQJM78wzOLVeCUAW7Y45", // Kings of Leon — Sex on Fire
  "2nLtzopw4rPReszdYBJU6h", // Linkin Park — Numb
  "4VqPOruhp5EdPBeR92t6lQ", // Muse — Uprising
  "7kzKAuUzOITUauHAhoMoxA", // The Strokes — Last Nite
  "57Xjny5yNzAcsxnusKmAfA", // The Strokes — Reptilia
  "6uV5q0yxaOujbxkwUCUEEf", // Arctic Monkeys — I Bet You Look Good on the Dancefloor
  "20I8RduZC2PWMWTDCZuuAN", // Franz Ferdinand — Take Me Out
  "0COqiPhxzoWICwFCS4eZcp", // Evanescence — Bring Me to Life
  "2DlHlPMa4M17kufBvI2lEN", // System of a Down — Chop Suey!
  "2xt2piJx6jlFkjS77YiqpL", // Audioslave — Like a Stone
  "6GuiZdJ4sZ4Dy67mjQ1al6", // My Chemical Romance — Welcome to the Black Parade
  "5VGlqQANWDKJFl0MBG3sg2", // Kings of Leon — Use Somebody
  "6SpLc7EXZIPpy0sVko0aoU" // Paramore — Misery Business
];

const initialSongs = [
  '{"id":"40riOy7x9W7GXjyGp4pjAv","name":"Hotel California - 2013 Remaster","artist":"Eagles","album":"Hotel California (2013 Remaster)","popularity":86,"image":"https://i.scdn.co/image/ab67616d000048514637341b9f507521afa9a778","url":"https://open.spotify.com/track/40riOy7x9W7GXjyGp4pjAv","summary":"A critique of the intoxicating allure and subsequent disillusionment of fame, materialism, and hedonistic lifestyle often associated with Hollywood and California in the 70s."}',
  '{"id":"0RO9W1xJoUEpq5MEelddFb","name":"Stairway to Heaven - Remaster","artist":"Led Zeppelin","album":"Led Zeppelin IV (Remaster)","popularity":68,"image":"https://i.scdn.co/image/ab67616d000048514509204d0860cc0cc67e83dc","url":"https://open.spotify.com/track/0RO9W1xJoUEpq5MEelddFb","summary":"An intricate lyrical journey depicting the pursuit of spiritual enlightenment, shunning materialistic desires, underscoring personal growth, and the wisdom in discerning truth in a world laden with dual meanings."}',
  `{"id":"48UPSzbZjgc449aqz8bxox","name":"Californication","artist":"Red Hot Chili Peppers","album":"Californication (Deluxe Edition)","popularity":86,"image":"https://i.scdn.co/image/ab67616d0000485194d08ab63e57b0cae74e8595","url":"https://open.spotify.com/track/48UPSzbZjgc449aqz8bxox","summary":"A critique of Hollywood's globally pervasive culture, critiquing the extremes of vanity, the artificial manufacture of allure, and the dichotomy of the California dream, while celebrating the creative potential that springs from its dichotomous extreme."}`,
  '{"id":"3dPQuX8Gs42Y7b454ybpMR","name":"Seven Nation Army","artist":"The White Stripes","album":"Elephant","popularity":88,"image":"https://i.scdn.co/image/ab67616d00004851a69f71a8794e2d867a52f98f","url":"https://open.spotify.com/track/3dPQuX8Gs42Y7b454ybpMR","summary":"A powerful representation of defiance against societal pressures and norms, highlighting the struggles one undergoes to maintain individuality and personal integrity."}',
  '{"id":"70LcF31zb1H0PyJoS1Sx1r","name":"Creep","artist":"Radiohead","album":"Pablo Honey","popularity":90,"image":"https://i.scdn.co/image/ab67616d00004851df55e326ed144ab4f5cecf95","url":"https://open.spotify.com/track/70LcF31zb1H0PyJoS1Sx1r","summary":"A melancholic anthem encapsulating feelings of extreme self-loathing, alienation, unrequited love, and desire for perfection and recognition, reflecting the societal pressures and frustrations of the generation represented."}',
  '{"id":"4jDt1y2gCPiqC3PgWuzLjW","name":"I Wanna Be Sedated - 2002 Remaster","artist":"Ramones","album":"Road to Ruin","popularity":55,"image":"https://i.scdn.co/image/ab67616d0000485111b0bfb72dc829e1d38d1cff","url":"https://open.spotify.com/track/4jDt1y2gCPiqC3PgWuzLjW","summary":"A brazen portrayal of the anxiety, monotony, and the desire for escape experienced by the alienated youth and disillusioned punk rock artists of the 1970s, symbolizing a rebellion against societal norms and a critique of fast-paced, conformist lifestyles."}',
  '{"id":"2zYzyRzz6pRmhPzyfMEC8s","name":"Highway to Hell","artist":"AC/DC","album":"Highway to Hell","popularity":87,"image":"https://i.scdn.co/image/ab67616d0000485151c02a77d09dfcd53c8676d0","url":"https://open.spotify.com/track/2zYzyRzz6pRmhPzyfMEC8s"}',
  '{"id":"63T7DJ1AFDD6Bn8VzG6JE8","name":"Paint It, Black","artist":"The Rolling Stones","album":"Aftermath","popularity":85,"image":"https://i.scdn.co/image/ab67616d00004851bad7062c3fd2f2d037989694","url":"https://open.spotify.com/track/63T7DJ1AFDD6Bn8VzG6JE8","summary":"An expressive narrative of overwhelming despair symbolized through colour imagery, representing a profound struggle with loss, mourning, and the desire for emotional numbness in the face of a starkly contrasting vibrant world."}',
  '{"id":"5UWwZ5lm5PKu6eKsHAGxOk","name":"Everlong","artist":"Foo Fighters","album":"The Colour And The Shape","popularity":87,"image":"https://i.scdn.co/image/ab67616d000048510389027010b78a5e7dce426b","url":"https://open.spotify.com/track/5UWwZ5lm5PKu6eKsHAGxOk","summary":"A poignant reflection on intense love and longing, underscored by fear of transience, symbolized through a narrative of waiting, surrender, and shared burdens from the past."}',
  `{"id":"5EWPGh7jbTNO2wakv8LjUI","name":"Free Bird","artist":"Lynyrd Skynyrd","album":"Pronounced' Leh-'Nerd 'Skin-'Nerd","popularity":81,"image":"https://i.scdn.co/image/ab67616d00004851128450651c9f0442780d8eb8","url":"https://open.spotify.com/track/5EWPGh7jbTNO2wakv8LjUI","summary":"A poignant balance between an individual's yearning for personal freedom, a desire for exploration, and the regrets accompanied by leaving someone they love, highlighting an honest confrontation of human relationships and hard truths about one's nature."}`,
  `{"id":"7snQQk1zcKl8gZ92AnueZW","name":"Sweet Child O' Mine","artist":"Guns N' Roses","album":"Appetite For Destruction","popularity":89,"image":"https://i.scdn.co/image/ab67616d0000485121ebf49b3292c3f0f575f0f5","url":"https://open.spotify.com/track/7snQQk1zcKl8gZ92AnueZW","summary":"An emotional testament to deep love and affection, rich in nostalgia and protective concern, yet tinged with the uncertainty and unpredictability of the future."}`,
  '{"id":"1bp2IO61zbQrbWNmKKxg3f","name":"The Joker","artist":"Steve Miller Band","album":"The Joker","popularity":78,"image":"https://i.scdn.co/image/ab67616d00004851375445cc7a2aedff11361b51","url":"https://open.spotify.com/track/1bp2IO61zbQrbWNmKKxg3f","summary":"A tribute to rebel individualism, depicting a multifaceted character who celebrates nonconformity, freedom, and love, whilst navigating life with a carefree, jovial demeanor."}',
  '{"id":"0ofHAoxe9vBkTCp2UQIavz","name":"Dreams - 2004 Remaster","artist":"Fleetwood Mac","album":"Rumours (Super Deluxe)","popularity":88,"image":"https://i.scdn.co/image/ab67616d00004851e52a59a28efa4773dd2bfe1b","url":"https://open.spotify.com/track/0ofHAoxe9vBkTCp2UQIavz","summary":"A profound articulation of the ephemeral nature of relationships, exploring the inseparability of love, loss, and liberation and using rainfall as a metaphor for the emotional turmoil and subsequent clarity that occurs during the ending of a relationship."}',
  `{"id":"7tFiyTwD0nx5a1eklYtX2J","name":"Bohemian Rhapsody - Remastered 2011","artist":"Queen","album":"A Night At The Opera (Deluxe Remastered Version)","popularity":75,"image":"https://i.scdn.co/image/ab67616d00004851ce4f1737bc8a646c8c4bd25a","url":"https://open.spotify.com/track/7tFiyTwD0nx5a1eklYtX2J","summary":"A deeply introspective and theatrical representation of existential crisis, struggle with identity, personal liberation, and resigned acceptance to life's vicissitudes, mirroring Freddie Mercury's reality through its intricate narrative and operatic soundscape."}`,
  `{"id":"61Q9oJNd9hJQFhSDh6Qlap","name":"House Of The Rising Sun","artist":"The Animals","album":"The Best Of The Animals","popularity":61,"image":"https://i.scdn.co/image/ab67616d000048513748833f246466f02d2d4fc3","url":"https://open.spotify.com/track/61Q9oJNd9hJQFhSDh6Qlap","summary":"A poignant cautionary tale about the pitfalls and harsh realities of temptation, vice, and a self-destructive lifestyle symbolized by the \\"House of The Rising Sun\\", where choices made can lead to lives plagued by 'sin and misery.'"}`,
  `{"id":"5Th6EdNVhxp0TPX41ZLZk6","name":"One Way Or Another - Remastered 2001","artist":"Blondie","album":"One Way Or Another","popularity":64,"image":"https://i.scdn.co/image/ab67616d0000485112f2f7d96b1bafa667c69a63","url":"https://open.spotify.com/track/5Th6EdNVhxp0TPX41ZLZk6","summary":"A portrayal of relentless pursuit and attraction, blended with a hint of obsession and manipulative tactics, showcasing the unique blend of punk, new wave, and pop influences that characterized Blondie's music in the late 70s and early 80s."}`,
  `{"id":"1xsYj84j7hUDDnTTerGWlH","name":"Dream On","artist":"Aerosmith","album":"Aerosmith","popularity":85,"image":"https://i.scdn.co/image/ab67616d00004851bbf0146981704a073405b6c2","url":"https://open.spotify.com/track/1xsYj84j7hUDDnTTerGWlH","summary":"A poignant exploration of the passage of time, self-reflection, learning from life's experiences, and the power of dreams and hope as a source of resilience amid the trials of existence."}`,
  `{"id":"7EZC6E7UjZe63f1jRmkWxt","name":"Zombie","artist":"The Cranberries","album":"No Need To Argue (The Complete Sessions 1994-1995)","popularity":86,"image":"https://i.scdn.co/image/ab67616d0000485172d481a5999197ef5f42f796","url":"https://open.spotify.com/track/7EZC6E7UjZe63f1jRmkWxt","summary":"A powerful protest against the numbing and dehumanizing effects of prolonged conflict, inspired by Ireland's Troubles, in which individuals are trapped in a seemingly unending cycle of violence that embeds itself into their consciousness, turning them metaphorically into the living dead—zombies."}`,
  '{"id":"6qLEOZvf5gI7kWE63JE7p3","name":"Interstate Love Song - 2019 Remaster","artist":"Stone Temple Pilots","album":"Purple (2019 Remaster)","popularity":78,"image":"https://i.scdn.co/image/ab67616d00004851fc7df879208b362bb1ce1499","url":"https://open.spotify.com/track/6qLEOZvf5gI7kWE63JE7p3","summary":"An emotive exploration of the pain, disillusionment, and hurt experienced from a tumultuous relationship marked by deceit and unfulfilled promises, symbolically traveling through the themes of disappointment, heartbreak, and emotional despair."}',
  '{"id":"1UBQ5GK8JaQjm5VbkBZY66","name":"Sharp Dressed Man - 2008 Remaster","artist":"ZZ Top","album":"Eliminator","popularity":76,"image":"https://i.scdn.co/image/ab67616d0000485128a00032ff3b86af3d7e0e54","url":"https://open.spotify.com/track/1UBQ5GK8JaQjm5VbkBZY66","summary":"A rock anthem that celebrates style and personal presentation, illustrating the allure of a well-dressed man and commenting on the societal value placed on appearance and material wealth."}',
  '{"id":"4P5KoWXOxwuobLmHXLMobV","name":"Come As You Are","artist":"Nirvana","album":"Nevermind (Remastered)","popularity":80,"image":"https://i.scdn.co/image/ab67616d00004851e175a19e530c898d167d39bf","url":"https://open.spotify.com/track/4P5KoWXOxwuobLmHXLMobV","summary":"A portrayal of the struggle between authenticity and societal expectation, set within the disenchanted context of 90s grunge culture."}',
  '{"id":"1JSTJqkT5qHq8MDJnJbRE1","name":"Every Breath You Take","artist":"The Police","album":"Synchronicity (Remastered 2003)","popularity":90,"image":"https://i.scdn.co/image/ab67616d00004851c8e97cafeb2acb85b21a777e","url":"https://open.spotify.com/track/1JSTJqkT5qHq8MDJnJbRE1","summary":"A portrayal of the intense and destructive obsession felt by an individual, masked under the guise of a romantic melody, while expressing profound yearning and a suffocating sense of surveillance."}',
  `{"id":"7ygpwy2qP3NbrxVkHvUhXY","name":"Wonderwall - Remastered","artist":"Oasis","album":"(What's The Story) Morning Glory? (Deluxe Remastered Edition)","popularity":80,"image":"https://i.scdn.co/image/ab67616d000048517a4c8c59851c88f6794c3cbf","url":"https://open.spotify.com/track/7ygpwy2qP3NbrxVkHvUhXY","summary":"A poignant exploration of unrequited love and longing, expressed through a metaphorical narrative that likens the object of the narrator's affections to a 'Wonderwall,' an idealised figure capable of emotional salvation."}`,
  `{"id":"2LawezPeJhN4AWuSB0GtAU","name":"Have You Ever Seen The Rain","artist":"Creedence Clearwater Revival","album":"Pendulum (Expanded Edition)","popularity":89,"image":"https://i.scdn.co/image/ab67616d0000485151f311c2fb06ad2789e3ff91","url":"https://open.spotify.com/track/2LawezPeJhN4AWuSB0GtAU","summary":"A philosophical rumination on life's inevitable cycles of joy and sorrow, captured through the paradoxical image of a sunshower, which also potentially reflects the band members' personal experiences during a period of turmoil."}`
];

export { playlistIDs, songIDs, initialSongs };
