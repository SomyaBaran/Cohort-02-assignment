//Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.
// (Hint: setTimeout)


function time(n){
   
        let i = 0;
        function count(){
            console.log(i);
            i++;

            if(i < n){
                setTimeout(count, 1000);
            }
        }
        setTimeout(count, 1000);
    }
time(10);