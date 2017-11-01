class Point {
	constructor(x, y, space, color, index){
		this.x = x;
		this.y = y;
		this.space = space
		this.index = index;
		this.size = index*space;
		this.speed = 10;
		this.color = color;
		this.newsize = this.size;
	}
	show(){
		let ncolor = this.color ? 255:0;
		// fill(ncolor);
		noFill();
		strokeWeight(1);
		stroke(ncolor,ncolor,ncolor, random(0,50));
		push()
			translate(this.x, this.y);
			ellipse(0,0, this.newsize, this.newsize);
		pop()

	}
	move(x, y, n){
		this.x = x;
		this.y = y;
		// this.speed = map(x, 0, width, -19, 19);
		this.newsize+=abs(this.speed)
		if(this.newsize >= this.size+this.space){
			// this.speed = -1;	
			this.newsize = this.size
			this.color = !this.color;
		}
		this.show();
	}
}

export default Point