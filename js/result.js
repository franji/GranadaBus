


function Header (name, number) 
{
	this.name = name;
	this.number = number;
}


function Bus_Stop (line, time, direction)
{
	this.line = line;
	this.time = time;
	this.direction = direction;
}




list_bus_stop = new Array();

header = new Header();
bus_stop = new Bus_Stop();


list_bus_stop.push(bus_stop);

