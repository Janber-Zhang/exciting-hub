$(document).ready(function(){
	var svg = d3.select('body').append('svg').attr('width', 300).attr('height', 300);
	var dataset = [ 1 , 0.5 , 1.7 , 1.3 , 0.9 , 2.8];
	var color = ["red", "blue", "green", "yellow", "black", "pink"];
	var linear = d3.scaleLinear()
				   .domain([0, d3.max(dataset)])
				   .range([0,300]);
	var axis = d3.axisBottom(linear)
				 .ticks(7)
	var rectHeight = 25;
	svg.selectAll('rect')
	   .data(dataset)
	   .enter()
	   .append('rect')
	   .attr('x', 20)
	   .attr('y', function(d, i){
	   		return i * rectHeight;
		})
	   .attr('width', function(d){
	   		return linear(d)
	    })
	   .attr('height', rectHeight-2)
	   .attr('fill', 'steelblue')
	   .append('g')
	   .call(axis)
});