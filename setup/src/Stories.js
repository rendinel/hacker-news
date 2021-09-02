import React from 'react'

import { useGlobalContext } from './context'

const Stories = () => {
  //we import hits and isloading from context.js with the useglobalcontext
  const { isLoading, hits, removeStory } = useGlobalContext()
  //01 if isLoading is true we show the loading component
  if (isLoading) {
    return <div className='loading'></div>
  }
  return (
    //03 we filled hits with our data from the api and as usual we map the array ,deconstrcut on show what we need
    <section className='stories'>
      {hits.map((story) => {
        const { objectID, title, num_comments, url, points, author } = story
        // before deconstructing it's bbetter to console what we return through the map story in this case
        console.log(story)
        return (
          <article key={objectID} className='story'>
            <h4 className='title'>{title}</h4>
            <p className='info'>
              {points} points by{' '}
              <span>
                {author} | {num_comments} comments{' '}
              </span>{' '}
            </p>
            <div>
              {/* inside the a we need to set up rel='noopener noreferrer' for security
                 and this open to open the link inside another page target='_blank' */}
              <a
                rel='noopener noreferrer'
                target='_blank'
                href={url}
                className='read-link'
              >
                read more
              </a>
              {/* 4 on click we launch removestory grabbing our id as a parameter */}
              <button
                onClick={() => removeStory(objectID)}
                className='remove-btn'
              >
                remove
              </button>
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default Stories
