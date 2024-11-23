class Presentation::VotesController < ApplicationController
  expose :presentation_votes, -> { search(Presentation::Vote.includes_associated) }
  expose :presentation_vote, find: ->(id, scope){ scope.includes_associated.find(id) }

  strong_params :presentation_vote, permit: %i(name data template)

  sortable_fields %w(data name template)

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes (theme_presentation_votes)
  def index
    authorize presentation_votes

    paginated_presentation_votes = paginate(presentation_votes, :presentation_votes)

    render inertia: "Presentation::Votes/Index", props: {
      presentation_votes: -> { paginated_presentation_votes.render(:index) },
      pagination: -> { {
        count: presentation_votes.size,
        **pagination_data(paginated_presentation_votes)
      } },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes/:id (theme_presentation_vote)
  def show
    authorize presentation_vote
    render inertia: "Presentation::Votes/Show", props: {
      presentation_vote: -> { presentation_vote.render(:show) }
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes/new (new_theme_presentation_vote)
  def new
    authorize Presentation::Vote.new
    render inertia: "Presentation::Votes/New", props: {
      presentation_vote: Presentation::Vote.new.render(:form_data)
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes/:id/edit (edit_theme_presentation_vote)
  def edit
    authorize presentation_vote
    render inertia: "Presentation::Votes/Edit", props: {
      presentation_vote: presentation_vote.render(:edit)
    }
  end

  # @route POST /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes (theme_presentation_votes)
  def create
    authorize Presentation::Vote.new
    if presentation_vote.save
      redirect_to presentation_vote, notice: "Vote was successfully created."
    else
      redirect_to new_presentation_vote_path, inertia: { errors: presentation_vote.errors }
    end
  end

  # @route PATCH /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes/:id (theme_presentation_vote)
  # @route PUT /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes/:id (theme_presentation_vote)
  def update
    authorize presentation_vote
    if presentation_vote.update(presentation_vote_params)
      redirect_to presentation_vote, notice: "Vote was successfully updated."
    else
      redirect_to edit_presentation_vote_path, inertia: { errors: presentation_vote.errors }
    end
  end

  # @route DELETE /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes/:id (theme_presentation_vote)
  def destroy
    authorize presentation_vote
    presentation_vote.destroy!
    redirect_to presentation_votes_url, notice: "Vote was successfully destroyed."
  end

end
