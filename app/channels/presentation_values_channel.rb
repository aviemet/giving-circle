class PresentationValuesChannel < ApplicationCable::Channel
  def subscribed
    presentation = Presentation.find(params[:presentation_id])
    stream_for presentation

    values = PresentationValues::Cache.fetch(presentation.id)
    transmit({
      type: "presentation_values_updated",
      presentation_values: values,
    })
  end

  def unsubscribed
  end

  def self.broadcast(presentation, values)
    broadcast_to(presentation, {
      type: "presentation_values_updated",
      presentation_values: values,
    })
  end
end
