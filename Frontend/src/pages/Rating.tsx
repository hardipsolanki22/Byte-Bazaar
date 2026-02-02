import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { Textarea } from '../components/lightswind/textarea'
import { Label } from '../components/lightswind/label'
import { Button } from '../components/lightswind/button'
import { Badge } from '../components/lightswind/badge'

const Rating: React.FC = () => {
    const [rating, setRating] = useState<number>(0)
    const [hoverRating, setHoverRating] = useState<number>(0)
    const [comment, setComment] = useState<string>('')


    return (
        <div className="flex flex-col min-h-screen items-center justify-center ">
            <div className="p-4 mt-4 bg-white rounded-md md:w-1/2 w-auto">
                <h2 className="text-center my-4 text-3xl font-semibold">Rate Your Experience</h2>
                <div className='mb-8'>
                    <p className='text-sm font-medium text-gray-700 mb-4 text-center'>Please rate us (1-5 stars)</p>
                    <div className='flex justify-center gap-4'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className='transition-transform hover:scale-110 focus:outline-none'
                            >
                                <Star
                                    width={40}
                                    height={40}
                                    className={`transition-colors 
                                        ${star <= (hoverRating || rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                        }
                                        `}
                                />
                            </button>
                        ))}
                    </div>
                    {rating > 0 && (
                        <p className='text-center mt-4 text-gray-600 font-medium'>
                            You rated:
                            {rating <= 2 ?
                                <Badge variant={'destructive'} className='ml-2'>
                                    {rating}
                                </Badge>
                                :
                                <Badge variant={'success'} className='ml-2'>
                                    {rating}
                                </Badge>
                            }
                        </p>
                    )}
                </div>

                {/* Comment Section */}
                <form className='flex flex-col mt-6 gap-4'>
                    <div>
                        <Label htmlFor="message">Add a Comment</Label>
                        <Textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Share your feedback and experience...'
                            className='mt-2'
                            rows={5}
                            id="message" />
                        <p className='text-xs text-gray-500 mt-2'>
                            {comment.length} / 500 characters
                        </p>
                    </div>
                    {/* Submit Button */}
                    <Button
                        className='cursor-pointer'
                    >
                        Submit Rating
                    </Button>
                </form>
            </div>
        </div>

    )
}

export default Rating
