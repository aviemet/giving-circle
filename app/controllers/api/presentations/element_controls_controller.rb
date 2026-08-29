class Api::Presentations::ElementControlsController < Api::ApiController
  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug
  expose :presentation,
    id: -> { params[:presentation_slug] },
    scope: -> { circle.presentations },
    find_by: :slug

  strong_params :element_control, permit: [:slide_id, :element_id, :element_type, :control, { value: [:minutes, :seconds] }]

  # @route PATCH /api/circles/:circle_slug/presentations/:presentation_slug/element_controls (api_circle_presentation_element_controls)
  # @route PUT /api/circles/:circle_slug/presentations/:presentation_slug/element_controls (api_circle_presentation_element_controls)
  def update
    authorize presentation, :controls?

    slide_id = element_control_params[:slide_id]
    element_id = element_control_params[:element_id]
    element_type = element_control_params[:element_type]
    control = element_control_params[:control]
    value = element_control_params[:value]

    if slide_id.blank? || element_id.blank? || element_type.blank? || control.blank? || value.nil?
      render json: {
        errors: {
          base: ["slide_id, element_id, element_type, control, and value are required"],
        },
      }, status: :unprocessable_content
      return
    end

    begin
      Presentations::ElementControls::Update.call(
        presentation: presentation,
        slide_id: slide_id,
        element_id: element_id,
        element_type: element_type,
        control: control,
        value: value,
      )
    rescue Presentations::ElementControls::Update::SlideNotFound
      render json: { errors: { slide_id: ["not found"] } }, status: :unprocessable_content
      return
    end

    ActivePresentation::Cache.schedule_refresh(presentation.id)

    render json: {
      element_controls: presentation.reload.element_controls,
    }, status: :accepted
  end
end
