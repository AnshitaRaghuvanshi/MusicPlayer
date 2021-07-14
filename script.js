let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume-show');
let slider = document.querySelector('#slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let autoplay = 0;
let index = 0;
let playing_song = false;
let  track = document.createElement('audio');

let Songs = [
    {name: "Animal",
     path: "media/Track1.mp3",
     img: "media/image1.jpg",
     singer: "Troye Sivan"
    },
    {name: "Flicker",
     path: "media/Track2.mpeg",
     img: "media/image2.jpg",
     singer: "Niall Horan"
    },
    {name: "Look Alike",
     path: "media/Track3.mp3",
     img: "media/image3.jpg",
     singer: "Conan Gray"
    },
    {name: "Cradles",
     path: "media/Track4.mp3",
     img: "media/image4.jpg",
     singer: "sub Urban"
    },
    {name: "Bellyache",
     path: "media/Track5.mp3",
     img: "media/image5.jpg",
     singer: "Billie Eilish"
    }

];  

function load_track(index){
    clearInterval(timer); 
    reset_slider(); 
    track.src = Songs[index].path;
    title.innerHTML = Songs[index].name;
    track_image.src = Songs[index].img;
    artist.innerHTML = Songs[index].singer;
    track.load();

    total.innerHTML = Songs.length;
    present.innerHTML = index + 1; 
    timer = setInterval(range_slider, 1000);
}
load_track(index);

function autoplay_switch(){
    if(autoplay==1){
        autoplay = 0;
        auto_play.style.background = "rgba(255,255,255,0.2)"; 
    }
    else{
        autoplay=1;
        auto_play.style.background =   "#148F77";
    }
}

function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}

function reset_slider(){
    slider.value = 0;
     
}
function justplay(){
    if(playing_song==false){
        playsong();
    }
    else{
        pausesong();
    }
}

function playsong(){
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="fa fa-pause" ></i>';
}

function pausesong(){
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class="fa fa-play"></i>';
}

function next_song(){
    if (index < Songs.length-1){
        index +=1;
        load_track(index);
        playsong();
    }  
    else{
        index = 0;
        load_track(index);
        playsong();
    }
}

function previous_song(){
    if (index > 0){
        index -= 1;
        load_track(index);
        playsong();
    }  
    else{
        index = Songs.length;
        load_track(index);
        playsong();
    }
}

function volume_change(){
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

function change_duration(){
      slider_position = track.duration * (slider.value / 100);
      track.currentTime = slider_position;
}

function range_slider(){
    let position = 0;
    if(!isNaN(track.duration)){
        position = track.currentTime * (100 / track.duration);
		slider.value =  position;
    }

    if(track.ended){
        play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
       if(autoplay==1){
           index += 1;
           load_track(index);
           playsong();
       }
    }
 }

