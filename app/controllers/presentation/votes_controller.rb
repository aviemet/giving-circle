class Presentation::VotesController < ApplicationController
  expose :presentation_votes, -> { search(Presentation::Vote.includes_associated) }
  expose :presentation_vote, find: ->(id, scope){ scope.includes_associated.find(id) }
  
  strong_params :presentation_vote, :data, :name, :template

  sortable_fields %w(data name template)

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

  def show
    authorize presentation_vote
    render inertia: "Presentation::Votes/Show", props: {
      presentation_vote: -> { presentation_vote.render(:show) }
    }
  end

  def new
    authorize Presentation::Vote.new
    render inertia: "Presentation::Votes/New", props: {
      presentation_vote: Presentation::Vote.new.render(:form_data)
    }
  end

  def edit
    authorize presentation_vote
    render inertia: "Presentation::Votes/Edit", props: {
      presentation_vote: presentation_vote.render(:edit)
    }
  end

  def create
    authorize Presentation::Vote.new
    if presentation_vote.save
      redirect_to presentation_vote, notice: "Vote was successfully created."
    else
      redirect_to new_presentation_vote_path, inertia: { errors: presentation_vote.errors }
    end
  end

  def update
    authorize presentation_vote
    if presentation_vote.update(presentation_vote_params)
      redirect_to presentation_vote, notice: "Vote was successfully updated."
    else
      redirect_to edit_presentation_vote_path, inertia: { errors: presentation_vote.errors }
    end
  end

  def destroy
    authorize presentation_vote
    presentation_vote.destroy!
    redirect_to presentation_votes_url, notice: "Vote was successfully destroyed."
  end

end
