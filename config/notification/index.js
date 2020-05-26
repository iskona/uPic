let stream = require('getstream');
let server = stream.connect('cbam34cnp437',process.env.GETSTREAM_SERVERKEY);
let feed = server.feed('notification', 'upic');

exports.CreateContest = function (contest) {
    activity = {'actor': 'upic', 'verb': 'ping', 'object':
        {   
            message: `New contest ${contest.title} in category ${contest.category} has been posted`,
            redirecturl : "/contests",
            title: `${contest.title}`
        }
    }
    feed.addActivity(activity)
}

exports.UpdateContests = function(contest) {
    activity = {'actor': 'upic', 'verb': 'ping', 'object':
        {   
            message: `Contest ${contest.title} in category ${contest.category} has been updated.`,
            redirecturl : "/contests",
            title: `${contest.title}`
        }
    }
    feed.addActivity(activity)
}