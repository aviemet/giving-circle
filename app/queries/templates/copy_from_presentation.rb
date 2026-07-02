class Templates::CopyFromPresentation
  def self.call(presentation:, name: nil, template: nil)
    new(presentation:, name:, template:).call
  end

  def initialize(presentation:, name: nil, template: nil)
    @presentation = presentation
    @name = name
    @template = template
  end

  def call
    if @template
      replace_template_slides!
      @template
    else
      create_template!
    end
  end

  private

  def create_template!
    template = Template.create!(
      name: @name.presence || "#{@presentation.name} Template",
      circle: @presentation.circle,
      settings: {},
    )
    copy_slides_to!(template)
    template
  end

  def replace_template_slides!
    @template.transaction do
      @template.slides.destroy_all
      copy_slides_to!(@template)
      @template.update!(version: @template.version + 1)
    end
  end

  def copy_slides_to!(template)
    @presentation.slides.each do |slide|
      new_slide = slide.dup
      new_slide.source_slide_id = nil
      new_slide.slug = nil
      template.slides << new_slide
      new_slide.save!
    end
  end
end
