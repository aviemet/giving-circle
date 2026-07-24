class Api::Presentations::InteractionMembershipsController < Api::ApiController
  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug
  expose :presentation,
    id: -> { params[:presentation_slug] },
    scope: -> { circle.presentations },
    find_by: :slug

  expose :presentation_interaction,
    model: "Presentation::Interaction",
    scope: -> { presentation.interactions },
    id: -> { params[:interaction_slug] },
    find: ->(slug, scope) { scope.friendly.find(slug) }

  expose :interaction_membership,
    model: "Presentation::InteractionMembership",
    scope: -> { presentation_interaction.interaction_memberships },
    id: -> { params[:id] }

  strong_params :presentation_interaction_membership, permit: [:votes]

  # @route PATCH /api/circles/:circle_slug/presentations/:presentation_slug/interactions/:interaction_slug/memberships/:id (api_circle_presentation_interaction_membership)
  # @route PUT /api/circles/:circle_slug/presentations/:presentation_slug/interactions/:interaction_slug/memberships/:id (api_circle_presentation_interaction_membership)
  def update
    authorize presentation_interaction, :update?, policy_class: Presentation::InteractionPolicy

    votes = presentation_interaction_membership_params[:votes]
    if votes.nil?
      render json: { errors: { votes: ["is required"] } }, status: :unprocessable_content
      return
    end

    interaction_membership.votes = votes
    interaction_membership.save!

    render json: {
      membership: {
        id: interaction_membership.id,
        membership_id: interaction_membership.membership_id,
        votes: interaction_membership.votes,
      },
    }, status: :accepted
  end
end
