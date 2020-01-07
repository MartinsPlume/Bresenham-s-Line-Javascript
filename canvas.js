


setInterval(rotation,1); // izsauc rotāciju katru milisekundi

function rotation(){

    var c = document.querySelector('canvas'), ctx = c.getContext("2d");
    var date = new Date; // pašreizējais datums
    var sec = date.getMilliseconds(); // pašreizējo milisekundi pieliek mainīgajam
    ctx.clearRect(0,0, c.width,c.height); // izdzēš iepriekšējo līniju

    angle = ((Math.PI * 2) * (sec/1000)) - ((Math.PI * 2) / 4); // leņķis

    let x2 = Math.round(c.width / 2 - Math.cos(angle) * 150);
    let y2 = Math.round(c.height / 2 - Math.sin(angle) * 150);
    //console.log(x2); // testēju vērtības
    //console.log(y2); // testēju vērtības
    drawLine(200,200,x2,y2);
    function drawLine(x1,y1,x2,y2){
        let x,y,dx,dy,pdx,pdy,px,py,xe,ye,i;

        dx = x2-x1; // x delta
        dy = y2-y1; // y delta

        // pozitīvas vērtības nobīdēm
        pdx = Math.abs(dx);
        pdy = Math.abs(dy);

        // kļūdas intervāls asīm
        px = 2 * (pdy - pdx);
        py = 2 * (pdx - pdy);

        if (pdy<=pdx){
            // x nobīde ir lielāka, tādēļ iterē pa x

            if (dx>=0) {
                // x2 ir lielāks par x1, kas nozīmē ka jāzīmē no pirmā punkta uz otro
                x = x1; // sākumpunkta x ir x1 vērtība
                y = y1; // sākumpunkta y ir y1 vērtība
                xe = x2; // iterējot pa x, x2 ir galapunkts
            } else {
                // x1 ir lielāks par x2, kas nozīmē ka jāzīmē ir no otrā punkta uz pirmo
                x = x2; // sākumpunkta x ir x2 vērtība
                y = y2; // sākumpunkta y ir y2 vērtība
                xe = x1; // iterējot pa x, x1 ir galapunkts
            }

            drawPixel(x,y); // iezīmē sākumpunkta pikseli --> kas sakrīt ar vai nu pirmo vai nu otro punktu

            // iterē pa x
            for (i=0;x<xe;i++){
                x+=1;
                //oktantes
                if (px<0){
                    // nobīdes intervāls, kāmēr zem 0, y vērtība nemainās
                    px+=2*pdy; // nobīde par vienu x vērtību
                } else {
                    if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                        //līnija iet uz "leju"
                        y += 1;
                    } else {
                        // līnija iet uz "augšu"
                        y -= 1;
                    }
                    // intervāls "atjaunots"
                    px += (2 * (pdy - pdx));
                }
                //iezīmē pikseli
                drawPixel(x,y);
            }

        } else {
            if (dy >= 0) {
                x = x1; y = y1; ye = y2;
            } else {
                x = x2; y = y2; ye = y1;
            }

            drawPixel(x,y); // iezīmē sākumpunktu

            //iterē pa y
            for (i = 0; y < ye; i++) {
                y += 1;
                //oktantes
                if (py <= 0) {
                    // nobīdes intervāls
                    py += 2 * pdx;
                } else {
                    if ((dx < 0 && dy<0) || (dx > 0 && dy > 0)) {
                        // līnija pa "labi"
                        x += 1;
                    } else {
                        // līnija pa "kreisi"
                        x -= 1;
                    }
                    // intervāls "atjaunots"
                    py +=(2 * (pdx - pdy));
                }

                //iezīmē pikseli
                drawPixel(x, y);
            }

        }
    }
    function drawPixel(xCoordinate,yCoordinate){
        ctx.fillRect(xCoordinate,yCoordinate,1,1);
    }
}

