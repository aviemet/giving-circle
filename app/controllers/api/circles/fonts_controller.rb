class Api::Circles::FontsController < Api::ApiController
  expose :circle, id: -> { params[:circle_slug] || params[:slug] }, find_by: :slug

  # @route GET /api/circles/:circle_slug/fonts (api_circle_fonts)
  def index
    authorize circle, :index?, policy_class: Circles::FontPolicy

    render json: Circles::FontSerializer.render(circle.fonts.attachments)
  end

  # @route POST /api/circles/:circle_slug/fonts (api_circle_fonts)
  def create
    authorize circle, :create?, policy_class: Circles::FontPolicy

    signed_id = params.require(:signed_id)
    blob = ActiveStorage::Blob.find_signed!(signed_id)

    unless Circle::Fonts.allowed_content_type?(blob.content_type, blob.filename.to_s)
      render json: { errors: ["Invalid font file"] }, status: :unprocessable_content
      return
    end

    circle.fonts.attach(blob)
    attachment = circle.fonts.attachments.find_by!(blob_id: blob.id)

    render json: Circles::FontSerializer.render(attachment), status: :created
  end
end
