import {React, useEffect, useState} from 'react';

import sampleVTT from '../Dashboard/components/VideoStatistics/Sample.vtt';

//import sampleVTT from '../../../Sample.vtt'

export default  function VideoGallery() {
 const [videos, setvideos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let jwtToken = localStorage.getItem('jwt_token');
        const response = await fetch('http://127.0.0.1:5000//display-videos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `session=.${jwtToken}`,
            'Authorization': `Bearer ${jwtToken}`
          }
        });
        let data = await response.json();
        setvideos(data.response_data.videos)

      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, []);

  return (
    <div className='m-5 videoGallery'>
      <div className='mt-3 d-flex justify-content-center'>
        <h1 className='display-4'>
          Video Gallery
        </h1>
      </div>
      <hr />

      <div className=" row">
        {videos.length ===0 ? 
        <div>No videos to show</div> :
        videos.map((video, index) => (

          <div key={index} className="col-4">
            <video width="350" height="270" controls >
              <source src={video.video_path}  />
              <track src={sampleVTT} label="Body language" kind="captions" srclang="en-us" default />
              <track src={sampleVTT} label="Body 2" kind="captions" srclang="en-us" default />
            </video>

            <h2 className="video-title">{video.videoTitle}</h2>
            <p className=''>
              {video.video_description}
            </p>

          </div>
        ))}
      </div>
    </div>
  )
}