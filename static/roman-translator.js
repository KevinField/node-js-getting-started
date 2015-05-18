'use strict';
module.exports = function(){
	var ones = 'i ii iii iv v vi vii viii ix x ';
	var n = (ones
		+ ones.replace(/x/g,'c').replace(/v/g,'l').replace(/i/g,'x')
		+ ones.replace(/x/g,'m').replace(/v/g,'d').replace(/i/g,'c')
	).toUpperCase().split(' ');
	n.pop(); // extra trailing space
	return {
		toRoman: function(num) {
			num = parseInt(num, 10); // in case passed as string
			var numeral = '';
			for (var i=n.length/10; i>0; i--) { // i is which digit, from the rightmost being "1"
				var digitVal = num - num%Math.pow(10,i-1);
				if (digitVal > 0) {
					numeral += n[(i-1)*10 + digitVal/Math.pow(10,i-1) - 1];
					num -= digitVal;
				}
			}
			return numeral;
		},
		toArabic: function(numeral) {
			var num = 0;
			while (numeral.length > 0) {
				var prevMatch = -1;
				for (var i=0; i<numeral.length; i++) { // try to match larger and larger chunks, from larger numbers 1st
					var chunk = numeral.slice(0,i+1),
						curMatch = -1;
					for (var j=n.length-1; j>=0; j--) {
						if (n[j] === chunk) {
							curMatch = j;
							break;
						}
					}
					if (curMatch === -1) {
						if (prevMatch === -1) { // no match, and no previous match...uhoh
							throw new Error ("We don't know about numerals like '" + chunk + "'");
						}
						break; // no match, going with previous best match
					}
					prevMatch = curMatch; // keep going (unless at end)
				}
				num += Math.pow(10,(prevMatch - prevMatch%10)/10) * ((prevMatch%10)+1);
				prevMatch++;
				numeral = numeral.slice(i);
			}
			return num;
		}
	};
}();
