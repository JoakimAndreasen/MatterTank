function collisions() {
	let collisions = Matter.Detector.collisions(engine.world, player.body);
	if (collisions.length > 0) {
		collisions.forEach((element) => {
			let bodies = [element.parentA, element.parentB];
			let player = bodies.find((body) => body.label == "player");
			if (player) {
				Matter.World.remove(engine.world, bodies);
			}
		});
	}
}
