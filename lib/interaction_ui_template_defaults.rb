module InteractionUiTemplateDefaults
  DEFINITIONS = [
    { name: "Allocation", slug: "allocation" },
    { name: "Organization vote", slug: "org_vote" },
    { name: "Finalist vote", slug: "finalist_vote" },
    { name: "Pledges", slug: "pledges" },
  ].freeze

  CURATED_SLUGS = %w[allocation finalist_vote pledges].freeze

  def self.seed!
    DEFINITIONS.each do |definition|
      template = InteractionUiTemplate.find_or_initialize_by(slug: definition[:slug])
      template.name = definition[:name]
      template.slug = definition[:slug]
      template.save!
    end
  end

  def self.allocation
    seed!
    InteractionUiTemplate.find_by!(slug: "allocation")
  end

  def self.org_vote
    seed!
    InteractionUiTemplate.find_by!(slug: "org_vote")
  end

  def self.finalist_vote
    seed!
    InteractionUiTemplate.find_by!(slug: "finalist_vote")
  end

  def self.pledges
    seed!
    InteractionUiTemplate.find_by!(slug: "pledges")
  end

  def self.for_config_slug(slug)
    case slug.to_s
    when "allocation-round"
      allocation
    when "finalist-vote"
      finalist_vote
    when "org-vote"
      org_vote
    when "pledges"
      pledges
    end
  end

  def self.curated?(slug)
    CURATED_SLUGS.include?(slug.to_s)
  end
end
