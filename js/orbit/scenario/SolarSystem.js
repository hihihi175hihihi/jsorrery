/** 

mass : kg
dist : km
apeed : km/s
radius: km

*/

define(
	[
		'orbit/NameSpace',
		'jquery'
	], 
	function(ns, $) {

		
		var cnf = {
			bodies : {
				sun : {
					mass : 1.9891e30,
					radius : 6.96342e5,
					color : '#ffff00',
					traceFrom : 0,
					k : 0.01720209895 //gravitational constant (μ)
				},
				mercury : {
					mass : 3.3022e23,
					radius:2439,
					color : '#cc9900',
					traceFrom : 0,
					isLog : true
				},
				venus : {
					mass : 4.868e24,
					radius : 6051,
					color : '#00cc99',
					traceFrom : 0,
					isLog : true
				},
				earth : {
					mass : 5.9736e24,
					radius : 6378.1,
					color : '#1F7CDA',
					traceFrom : 0,
					isLog : true
				},
				mars : {
					mass : 6.4185e23,
					radius : 3376,
					color : '#ff3300',
					traceFrom : 0,
					isLog : true
				}
				,
				jupiter : {
					mass : 1.8986e27,
					radius : 71492,
					color : '#ff9932',
					traceFrom : 0,
					isLog : true
				},
				saturn : {
					mass : 5.6846e26,
					radius : 60268,
					color : '#ffcc99',
					traceFrom : 0,
					isLog : true
				},
				uranus : {
					mass : 8.6810e25,
					radius : 25559,
					color : '#99ccff',
					traceFrom : 0,
					isLog : true
				},
				neptune : {
					mass : 1.0243e26,
					radius : 24764,
					color : '#3299ff',
					traceFrom : 0,
					isLog : true
				},
				pluto : {
					mass : 1.305e22+1.52e21,
					radius : 1153,
					color : '#aaaaaa',
					traceFrom : 0,
					isLog : true
				}
				,
				halley : {
					mass : 2.2e14,
					radius : 50,
					color : '#ffffff',
					isLog : true
				}/**/
			},
			
			secondsPerTick : 3600*24 * 7,
			calculationsPerTick : 1000

		};


		var orbitalElements = {
			mercury : { 
				base : {a : 0.38709927 * ns.AU ,  e : 0.20563593, i: 7.00497902, l : 252.25032350, lp : 77.45779628, o : 48.33076593},
				cy : {a : 0.00000037 * ns.AU ,  e : 0.00001906, i: -0.00594749, l : 149472.67411175, lp : 0.16047689, o : -0.12534081}
			},
			venus : {
				base : {a : 0.72333566 * ns.AU ,  e : 0.00677672, i: 3.39467605, l : 181.97909950, lp : 131.60246718, o : 76.67984255},
				cy : {a : 0.00000390 * ns.AU ,  e : -0.00004107, i: -0.00078890, l : 58517.81538729, lp : 0.00268329, o : -0.27769418}
			},
			mars : {
				base : {a : 1.52371034 * ns.AU ,  e : 0.09339410, i: 1.84969142, l : -4.55343205, lp : -23.94362959, o : 49.55953891},
				cy : {a : 0.00001847 * ns.AU ,  e : 0.00007882, i: -0.00813131, l : 19140.30268499, lp : 0.44441088, o : -0.29257343}
			},
			earth : {
				base : {a : 1.00000261 * ns.AU, e : 0.01671123, i : -0.00001531, l : 100.46457166, lp : 102.93768193, o : 0.0},
          		cy : {a : 0.00000562 * ns.AU, e : -0.00004392, i : -0.01294668, l : 35999.37244981, lp : 0.32327364, o : 0.0}
			},
 			jupiter : {
				base : {a : 5.20288700 * ns.AU ,  e : 0.04838624, i: 1.30439695, l : 34.39644051, lp : 14.72847983, o : 100.47390909},
				cy : {a : -0.00011607 * ns.AU ,  e : -0.00013253, i: -0.00183714, l : 3034.74612775, lp : 0.21252668, o : 0.20469106}
			},
			saturn : {
				base : {a : 9.53667594 * ns.AU ,  e : 0.05386179, i: 2.48599187, l : 49.95424423, lp : 92.59887831, o : 113.66242448},
				cy : {a : -0.00125060 * ns.AU ,  e : -0.00050991, i: 0.00193609, l : 1222.49362201, lp : -0.41897216, o : -0.28867794}
			},
			uranus : {
				base : {a : 19.18916464 * ns.AU ,  e : 0.04725744, i: 0.77263783, l : 313.23810451, lp : 170.95427630, o : 74.01692503},
				cy : {a : -0.00196176 * ns.AU ,  e : -0.00004397, i: -0.00242939, l : 428.48202785, lp : 0.40805281, o : 0.04240589}
			},
			neptune : {
				base : {a : 30.06992276  * ns.AU,  e : 0.00859048, i: 1.77004347, l : -55.12002969, lp : 44.96476227, o : 131.78422574},
				cy : {a : 0.00026291  * ns.AU,  e : 0.00005105, i: 0.00035372, l : 218.45945325, lp : -0.32241464, o : -0.00508664}
			},
			pluto : {
				base : {a : 39.48211675 * ns.AU ,  e : 0.24882730, i: 17.14001206, l : 238.92903833, lp : 224.06891629, o : 110.30393684},
				cy : {a : -0.00031596 * ns.AU ,  e : 0.00005170, i: 0.00004818, l : 145.20780515, lp : -0.04062942, o : -0.01183482}
			},
			halley : {
				base : {a : 17.83414429 * ns.AU ,  e : 0.967142908, i: 162.262691, M : 0, w : 111.332485, o : 58.420081},
				day : {a : 0 ,  e : 0, i: 0, M : (360 / (76 * 365.25) ), w : 0, o : 0}
			}
		};

		$.each(orbitalElements, function(planet, elements){
			if(cnf.bodies[planet]) cnf.bodies[planet].orbit = elements;
		});

		return cnf;
		
	}
);