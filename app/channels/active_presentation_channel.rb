class ActivePresentationChannel < ApplicationCable::Channel
  def subscribed
    presentation = Presentation.find(params[:presentation_id])
    stream_for presentation
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def switch_slide(data)
    presentation = Presentation.find(data["presentation_id"])
    slide = presentation.slides.find(data["slide_id"])

    presentation.update(active_slide: slide)

    ActivePresentationChannel.broadcast_to(presentation, {
      type: "slide_switched",
      active_slide: slide.id
    },)
  end

  def update_slide(data)
    presentation = Presentation.find(data["presentation_id"])
    slide = presentation.slides.find(data["slide_id"])

    slide.update!(content: data["content"])

    ActivePresentationChannel.broadcast_to(presentation, {
      type: "slide_updated",
      slide_id: slide.id,
      content: slide.content
    },)
  end
end
